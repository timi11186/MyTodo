// 活动接口定义，表示一个活动相关的信息
interface Activity {
  id: number; // 活动的唯一标识符
  name: string; // 活动名称
  todos?: Todo[]; // 该活动包含的任务列表（可选）
  description?: string; // 活动详细描述（可选）
  startTime?: string; // 活动开始时间（可选）
  duration?: string; // 活动持续时间（可选）
}

// 任务类型相关的各种时间配置基础类型

// 仅一次任务的时间相关配置，包含创建时间和修改时间
type OnlyOnceTaskTimeConfig = {
  creationTime: Date; // 创建时间
  modificationTime: Date; // 修改时间
};

// 每日任务的时间相关配置，包含开始时间、结束时间以及创建时间和修改时间
type DailyTaskTimeConfig = {
  startTime: string; // 开始时间
  endTime?: string; // 结束时间
  creationTime: Date; // 创建时间
  modificationTime: Date; // 修改时间
};

// 每周任务的时间相关配置，包含开始时间、结束时间、指定周数以及创建时间和修改时间
type WeeklyTaskTimeConfig = {
  startTime: string; // 开始时间
  endTime: string; // 结束时间
  week: 1 | 2 | 3 | 4 | 5 | 6 | 7; // 指定周数
  creationTime: Date; // 创建时间
  modificationTime: Date; // 修改时间
};

// 每月任务的时间相关配置，包含开始时间、结束时间、指定月份以及创建时间和修改时间
type MonthlyTaskTimeConfig = {
  startTime: string; // 开始时间
  endTime: string; // 结束时间
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // 指定月份
  creationTime: Date; // 创建时间
  modificationTime: Date; // 修改时间
};

// 每年任务的时间相关配置，包含开始时间、结束时间、指定月份、指定日期以及创建时间和修改时间
type YearlyTaskTimeConfig = {
  startTime: string; // 开始时间
  endTime: string; // 结束时间
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // 指定月份
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31; // 指定日期
  creationTime: Date; // 创建时间
  modificationTime: Date; // 修改时间
};

// 指定时间任务的时间相关配置，包含开始时间、结束时间以及创建时间和修改时间
type SpecifiedTimeTaskTimeConfig = {
  startTime: Date; // 开始时间
  endTime: Date; // 结束时间
  creationTime: Date; // 创建时间
  modificationTime: Date; // 修改时间
};

// 任务类型枚举，包含各种不同执行频率的任务类型
type TodoType =
  | OnlyOnceTaskTimeConfig // 仅一次任务
  | DailyTaskTimeConfig // 每日任务
  | WeeklyTaskTimeConfig // 每周任务
  | MonthlyTaskTimeConfig // 每月任务
  | YearlyTaskTimeConfig // 每年任务
  | SpecifiedTimeTaskTimeConfig; // 指定时间任务

// 任务接口定义，表示一个具体的任务相关信息
interface Todo {
  id: number; // 任务的唯一标识符
  text: string; // 任务的名称描述
  desc?: string; // 任务的描述
  type: "onlyOnce" | "daily" | "weekly" | "monthly" | "yearly" | "specifiedTime"; // 任务的类型
  typeData: TodoType; // 任务所属的类型（如仅一次、每日等）
  completed: boolean; // 任务是否已完成
  createdAt: Date; // 任务创建的时间
  from?: Activity['id']; // 任务所属的活动（可选）
  modifiedAt?: Date; // 任务修改的时间（可选）
  completedAt?: Date; // 任务完成的时间（可选）
}

// 导出活动和任务相关的接口类型，方便外部模块使用
export { Activity, Todo, TodoType };