import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { RequirementEvidenceManifestSchema, verifyRequirementEvidenceManifest } from "@theme-tools/testing/capability-evidence";
const manifest = RequirementEvidenceManifestSchema.parse(JSON.parse(fs.readFileSync("docs/requirement-evidence.json", "utf8")));
test("planned evidence is valid without claiming completion", () => {
  const record = manifest.records[0];
  const report = verifyRequirementEvidenceManifest(manifest, { repositoryRevisions: { [record.implementation.repository]: record.implementation.revision } });
  assert.equal(report.valid, true);
  assert.deepEqual(report.passRecordIds, []);
  assert.equal(record.status, "planned");
});
