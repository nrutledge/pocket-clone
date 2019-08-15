interface Reqbody {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default (fields: string[], reqBody: Reqbody): void => {
  fields.forEach((field: string) => {
    if (!reqBody[field]) {
      throw new Error(`${field} not provided`);
    }
  });
};
