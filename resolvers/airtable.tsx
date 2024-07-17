export interface PerformanceMetrics {
  program: string;
  hashfn: string;
  shard_size: number;
  cycles: number;
  speed: number;
  execution_duration: number;
  prove_duration: number;
  verify_duration: number;
}

export function formatAirtablePerformanceMetrics(records): PerformanceMetrics[] {
  console.log(records);
  
  if (!records?.records) return [];

  return records?.records.map((record) => {
    return {
      program: record?.fields?.Program || null,
      hashfn: record?.fields?.Hashfn || null,
      shard_size: record?.fields?.ShardSize || null,
      cycles: record?.fields?.Cycles || null,
      speed: record?.fields?.Speed || null,
      execution_duration: record?.fields?.ExecutionDuration || null,
      prove_duration: record?.fields?.ProveDuration || null,
      verify_duration: record?.fields?.VerifyDuration || null,
    };
  });
}

export function resolveAirtablePerformanceMetricsList({ performanceMetricsList }) {
  const formattedPerformanceMetrics = formatAirtablePerformanceMetrics(performanceMetricsList);

  return formattedPerformanceMetrics;
}

