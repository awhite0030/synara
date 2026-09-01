import * as Effect from "effect/Effect";
import * as SqlClient from "effect/unstable/sql/SqlClient";

export default Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient;

  yield* sql`
    UPDATE projection_threads
    SET runtime_mode = 'full-access'
    WHERE runtime_mode = 'auto-accept-edits'
  `;

  yield* sql`
    UPDATE projection_thread_sessions
    SET runtime_mode = 'full-access'
    WHERE runtime_mode = 'auto-accept-edits'
  `;

  yield* sql`
    UPDATE provider_session_runtime
    SET runtime_mode = 'full-access'
    WHERE runtime_mode = 'auto-accept-edits'
  `;

  yield* sql`
    UPDATE automation_definitions
    SET runtime_mode = 'full-access'
    WHERE runtime_mode = 'auto-accept-edits'
  `;

  yield* sql`
    UPDATE external_mcp_integrations
    SET runtime_mode = 'full-access'
    WHERE runtime_mode = 'auto-accept-edits'
  `;

  yield* sql`
    UPDATE orchestration_events
    SET payload_json = json_set(payload_json, '$.runtimeMode', 'full-access')
    WHERE json_extract(payload_json, '$.runtimeMode') = 'auto-accept-edits'
  `;
});
