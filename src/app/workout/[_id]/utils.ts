export function createUrlWithSearchParams(input: {
  baseUrl: string;
  isAuto?: boolean;
  isComplete?: boolean;
  sectionIndex?: number;
  instanceIndex?: number;
}) {
  let params: { auto?: string; fin?: string; si?: string; in?: string } = {};

  if (input?.isAuto) {
    params.auto = input?.isAuto.toString();
  }
  if (input?.isComplete) {
    params.fin = input?.isComplete.toString();
  }
  if (input?.sectionIndex || input.sectionIndex === 0) {
    params.si = input?.sectionIndex.toString();
  }
  if (input?.instanceIndex || input.instanceIndex === 0) {
    params.in = input?.instanceIndex.toString();
  }

  return `${input.baseUrl}?` + new URLSearchParams(params);
}
