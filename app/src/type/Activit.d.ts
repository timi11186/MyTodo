// 活动接口定义，表示一个活动相关的信息
interface Activity {
  id: number; // 活动的唯一标识符
  name: string; // 活动名称
  schedule?: string; // 活动安排相关描述（可选）
  todos?: Todo[]; // 该活动包含的任务列表（可选）
  description?: string; // 活动详细描述（可选）
  startTime?: string; // 活动开始时间（可选）
  duration?: string; // 活动持续时间（可选）
}

// 任务类型相关的各种时间配置基础类型

// 仅一次任务的时间相关配置，包含创建时间和修改时间
type OnlyOnceTaskTimeConfig = {
  creationTime: Date;
  modificationTime: Date;
};

// 每日任务的时间相关配置，包含开始时间、结束时间以及创建时间和修改时间
type DailyTaskTimeConfig = {
  startTime: string;
  endTime: string;
  creationTime: Date;
  modificationTime: Date;
};

// 每周任务的时间相关配置，包含开始时间、结束时间、指定周数以及创建时间和修改时间
type WeeklyTaskTimeConfig = {
  startTime: string;
  endTime: string;
  week: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  creationTime: Date;
  modificationTime: Date;
};

// 每月任务的时间相关配置，包含开始时间、结束时间、指定月份以及创建时间和修改时间
type MonthlyTaskTimeConfig = {
  startTime: string;
  endTime: string;
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  creationTime: Date;
  modificationTime: Date;
};

// 每年任务的时间相关配置，包含开始时间、结束时间、指定月份、指定日期以及创建时间和修改时间
type YearlyTaskTimeConfig = {
  startTime: string;
  endTime: string;
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
  creationTime: Date;
  modificationTime: Date;
};

// 指定时间任务的时间相关配置，包含开始时间、结束时间以及创建时间和修改时间
type SpecifiedTimeTaskTimeConfig = {
  startTime: Date;
  endTime: Date;
  creationTime: Date;
  modificationTime: Date;
};

// 任务类型枚举，包含各种不同执行频率的任务类型
type ActivityType = 
  | OnlyOnceTaskTimeConfig 
  | DailyTaskTimeConfig 
  | WeeklyTaskTimeConfig 
  | MonthlyTaskTimeConfig 
  | YearlyTaskTimeConfig 
  | SpecifiedTimeTaskTimeConfig;

// 任务接口定义，表示一个具体的任务相关信息
interface Todo {
  id: number; // 任务的唯一标识符
  text: string; // 任务的名称描述
  type: ActivityType; // 任务所属的类型（如仅一次、每日等）
  completed: boolean; // 任务是否已完成
  createdAt: Date; // 任务创建的时间
  completedAt?: Date; // 任务完成的时间（可选）
}

// 导出活动和任务相关的接口类型，方便外部模块使用
export { Activity, Todo };