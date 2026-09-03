async function loadDistrictData(districtName) {
  try {
    // Relative path ./ se load karein
    const res = await fetch(`./districts/${districtName.toLowerCase()}.json`);
    if (!res.ok) throw new Error("File not found");
    currentDistrictData = await res.json();
    populateDestinations();
    document.getElementById("statusMessage").innerText = `${currentDistrictData.district} ke routes load ho gaye. 'Buses Khojein' dabayein.`;
  } catch (err) {
    console.error(err);
    document.getElementById("statusMessage").innerText = "Data load nahi ho paya. Path check karein.";
  }
}
