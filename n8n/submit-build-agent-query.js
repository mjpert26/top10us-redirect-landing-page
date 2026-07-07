// ── n8n Code node: "Build Agent Query" ───────────────────────────────────────
// Runs after Patch Lead (success). Resolves the Lead Id from Prep Patch and
// builds a SOQL query for the assigned owner. TYPEOF handles the case where the
// lead is owned by a queue (Group) instead of a User without erroring.
const patchUrl = $('Prep Patch').item.json.patchUrl || '';
const id = String(patchUrl).split('/').pop();

const soql =
  "SELECT Id, TYPEOF Owner " +
  "WHEN User THEN Name, Title, Email, Phone, MobilePhone, Personal_Cell_Phone_Number__c, Headshot_Photo__c, User_Photo_URL__c " +
  "ELSE Name END " +
  "FROM Lead WHERE Id='" + id + "' LIMIT 1";

const agentUrl =
  'https://bigthink.my.salesforce.com/services/data/v60.0/query/?q=' + encodeURIComponent(soql);

return { agentUrl };
