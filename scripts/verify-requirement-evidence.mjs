#!/usr/bin/env node
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { RequirementEvidenceManifestSchema, verifyRequirementEvidenceManifest } from "@theme-tools/testing/capability-evidence";
const manifest = RequirementEvidenceManifestSchema.parse(JSON.parse(fs.readFileSync("docs/requirement-evidence.json", "utf8")));
const revision = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const repository = manifest.records[0]?.implementation.repository;
const report = verifyRequirementEvidenceManifest(manifest, { repositoryRevisions: repository ? { [repository]: revision } : {} });
if (!report.valid) { console.error(JSON.stringify(report, null, 2)); process.exit(1); }
console.log(JSON.stringify(report, null, 2));
