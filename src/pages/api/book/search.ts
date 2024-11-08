export default async function async(req: any, res: any) {
  try {
    const aladinAPIUrl =
      "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbdhdhndndn1524001&Query=한강&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101";
    const response = await fetch(aladinAPIUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch data from Aladin API");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
