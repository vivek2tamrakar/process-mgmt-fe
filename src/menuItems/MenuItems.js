const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    // icon:  ,
    children: [
      { name: "Submenu 1", path: "/dashboard/sub1" },
      { name: "Submenu 2", path: "/dashboard/sub2" },
    ],
  },
  {
    name: "About",
    path: "/about",
    // icon: <ProjectIcon />,
    children: [
      { name: "Project 1", path: "/projects/1" },
      { name: "Project 2", path: "/projects/2" },
    ],
  },
];

export default menuItems;
