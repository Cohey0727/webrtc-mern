"use client";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import React, { Suspense, useMemo, useState } from "react";
import { Column, ErrorBoundary, Loading, Row, SideNavigation, useAuth } from "@/components";
import styles from "./styles";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { Avatar, Tooltip } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HomeTemplateProps = {
  children: React.ReactNode;
};

type MenuItem = {
  title: string;
  icon: React.ComponentType;
  path: string;
};

const menus: (MenuItem | typeof Divider)[] = [
  {
    title: "ホーム",
    icon: MessageOutlinedIcon,
    path: "/home",
  },
];

const HomeTemplate: React.FC<HomeTemplateProps> = (props) => {
  const { children } = props;
  const pathname = usePathname();
  const { logout, userId } = useAuth();

  const currentPath = useMemo(() => {
    const regex = /(^\/[\w-]+)\/*/;
    const match = pathname.match(regex);
    return match ? match[1] : "/home";
  }, [pathname]);

  const footerMenus = useMemo(() => {
    if (!userId) return [];
    return [
      {
        title: userId,
        icon: <Avatar src={""} sx={styles.avatarImage} />,
      },
      {
        title: "ログアウト",
        icon: <LogoutOutlinedIcon />,
        onClick: () => logout(),
      },
    ];
  }, [logout, userId]);

  return (
    <Row sx={styles.root}>
      <Column>
        <Column sx={styles.navigationTop}>
          <List>
            {menus.map((menu, index) => {
              if (!isMenuItem(menu)) {
                // Divider
                return <Divider key={`divider-${index}`} />;
              }
              const { path, title, icon: Icon } = menu;
              const isSelected = path === currentPath;
              return (
                <Link key={path} href={`${path}/`}>
                  <Tooltip title={title} arrow placement="right">
                    <ListItem disablePadding>
                      <ListItemButton sx={styles.menuItemButton} selected={isSelected}>
                        <ListItemIcon sx={styles.menuItemIcon}>
                          <Icon />
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>
                </Link>
              );
            })}
          </List>
        </Column>
        <Column sx={styles.navigationBottom}>
          {footerMenus.map(({ title, icon, onClick }, index) => {
            return (
              <React.Fragment key={`${title}-${index}`}>
                <Tooltip title={title} arrow placement="right">
                  <ListItem disablePadding>
                    <ListItemButton sx={styles.menuItemButton} onClick={onClick}>
                      <ListItemIcon sx={styles.menuItemIcon}>{icon}</ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              </React.Fragment>
            );
          })}
        </Column>
      </Column>
      <Box component="main" sx={styles.main}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        {/* <ErrorBoundary
          refreshDependency={pathname}
          fallback={(e, reset) => (
            <ErrorPage error={e}>
              <Button
                variant="contained"
                onClick={() => {
                  navigate({ to: "/home/" });
                  // navigateが同期的でないため、少し遅らせてリセットする
                  setTimeout(() => reset(), 100);
                }}
              >
                ホーム画面へ
              </Button>
            </ErrorPage>
          )}
        >
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ErrorBoundary> */}
      </Box>
    </Row>
  );
};

const isMenuItem = (item: any): item is MenuItem => {
  return item.title && item.icon && item.path;
};

export default HomeTemplate;
