import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/authorization";
import { getDbPool } from "@/lib/db/mysql";
import type { RowDataPacket } from "mysql2";

export async function POST(request: NextRequest) {
  // Verify that the user calling the route has an active session and is strictly an ADMIN
  const session = getSessionFromRequest(request);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized: Active session required." },
      { status: 401 }
    );
  }

  if (session.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Forbidden: Admin access required." },
      { status: 403 }
    );
  }

  const pool = getDbPool();
  let connection;

  try {
    // Acquire a dedicated connection from the pool so session variables are preserved
    connection = await pool.getConnection();

    // Execute the stored procedure
    await connection.query("CALL ProcessMonthlyInterest(NULL, @credits, @total);");

    // Fetch the procedure's output variables
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT @credits AS credits_created, @total AS total_interest;"
    );

    const creditsCreated = Number(rows[0]?.credits_created ?? 0);
    const totalInterest = Number(rows[0]?.total_interest ?? 0);

    return NextResponse.json({
      success: true,
      message: "Monthly interest processed successfully.",
      credits_created: creditsCreated,
      total_interest: totalInterest,
    });
  } catch (error) {
    console.error("Error executing ProcessMonthlyInterest:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to process monthly interest.",
      },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
