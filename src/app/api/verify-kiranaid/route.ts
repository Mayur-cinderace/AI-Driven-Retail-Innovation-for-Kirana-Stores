import { NextResponse } from "next/server";
import { getDbByRole } from "@/lib/mongo";

export async function POST(req: Request) {
  const { mobileNumber, role, kiranaID } = await req.json();
  try {
    const db = await getDbByRole(role);
    const user = await db
      .collection("signups")
      .findOne({ mobileNumber, kiranaID });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Incorrect KiranaID." },
        { status: 401 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[Verify Error]", e);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
