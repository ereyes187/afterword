import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const apiParams = new URLSearchParams();
    console.log(apiParams);

    for (const [key, value] of searchParams) {
      if (!value) {
        continue;
      }
      apiParams.append(key, value);
    }

    const res = await fetch(
      `https://openlibrary.org/search.json?${apiParams.toString()}`,
    );
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  }
}
