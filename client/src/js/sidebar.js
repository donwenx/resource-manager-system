const sidebar = [
  {
    title: "资源管理",
    id: "1",
    icon: "el-icon-setting",
    children: [
      { title: "使用统计", id: "/" },
      { title: "资源上传", id: "/upload" },
      { title: "资源下载", id: "/download" },
      { title: "资源列表", id: "/resourceList" },
    ],
  },
  {
    title: "用户管理",
    id: "2",
    icon: "el-icon-menu",
    children: [{ title: "用户列表", id: "/userList" }],
    authority: '超级管理员',
  },
  {
    title: "分类管理",
    id: "3",
    icon: "el-icon-document",
    children: [{ title: "分类列表", id: "/category" }],
    authority: '超级管理员',
  },
]

export const getSidebar = (authority) => {
  if(authority === '超级管理员') {
    return sidebar;
  }

  return sidebar.filter((item) => {
    return item.authority !== '超级管理员';
  })
}