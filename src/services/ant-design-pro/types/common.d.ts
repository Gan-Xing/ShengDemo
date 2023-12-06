// 与后端约定的响应数据格式
declare namespace Common {
  // 错误处理方案： 错误类型
  enum ErrorShowType {
    SILENT = 0,
    WARN_MESSAGE = 1,
    ERROR_MESSAGE = 2,
    NOTIFICATION = 3,
    REDIRECT = 9,
  }
  interface ResponseStructure<T> {
    statusCode: number;
    timestamp: string;
    path: string;
    message: string;
    data: T;
    success: boolean;
    showType?: ErrorShowType;
  }
  interface TreeNode {
    title: string;
    key: string;
    children?: TreeNode[];
  }
}
