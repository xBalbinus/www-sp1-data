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
      program: record?.fields?.program || null,
      hashfn: record?.fields?.hashfn || null,
      shard_size: record?.fields?.shard_size || null,
      cycles: record?.fields?.cycles || null,
      speed: record?.fields?.speed || null,
      execution_duration: record?.fields?.execution_duration || null,
      prove_duration: record?.fields?.prove_duration || null,
      verify_duration: record?.fields?.verify_duration || null,
    };
  });
}

export function resolveAirtablePerformanceMetricsList({ performanceMetricsList }) {
  const formattedPerformanceMetrics = formatAirtablePerformanceMetrics(performanceMetricsList);

  return formattedPerformanceMetrics;
}

