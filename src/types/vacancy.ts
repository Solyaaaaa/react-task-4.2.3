export interface Salary {
  from: number | null;
  to: number | null;
  currency: string;
}

export interface Vacancy {
  id: string;
  name: string;
  salary: Salary | null;
  experience: {
    name: string;
  };
  employer: {
    name: string;
  };
  work_format: {
    name: string;
  }[];
  area: {
    name: string;
  };
  alternate_url: string;
  description?: string;
}

