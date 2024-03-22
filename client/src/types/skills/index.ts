export type ProblemType = {
  id: number;
  name: string;
  problemTime: number;
  skillId: number;
  createdAt: string;
  updatedAt: string;
};

export type SkillType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  Problems: ProblemType[];

};

export type SkillSliceType = SkillType[];
