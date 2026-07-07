// ── n8n Code node: "Shape Agent" ─────────────────────────────────────────────
// Shapes the assigned owner (only when it's a User) into the compact agent
// payload the landing page renders on the success screen. Returns agent: null
// for queue-owned leads or if the lookup returned nothing.
const recs = Array.isArray($json.records) ? $json.records : [];
const o = recs.length ? recs[0].Owner : null;

let agent = null;
if (o && o.attributes && o.attributes.type === 'User') {
  agent = {
    name: o.Name || null,
    title: o.Title || null,
    email: o.Email || null,
    phone: o.Phone || o.Personal_Cell_Phone_Number__c || o.MobilePhone || null,
    photoUrl: o.Headshot_Photo__c || o.User_Photo_URL__c || null,
  };
}

return { agent };
