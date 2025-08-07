import { NextResponse } from "next/server";
import { getDbByRole } from "@/lib/mongo";

export async function POST(req: Request) {
  const { mobileNumber, role } = await req.json();
  try {
    const db = await getDbByRole(role);
    const user = await db.collection("signups").findOne({ mobileNumber });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[Login Error]", e);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
