import React, { useState, Suspense } from 'react'
import { Layout, Menu } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, PieChartOutlined } from '@ant-design/icons'
import { LoadingPage } from '@src/components/tools-page'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
const Page1 = React.lazy(() => import(/* webpackChunkName: 'page1' */ '@src/pages/page1'))
const Page2 = React.lazy(() => import(/* webpackChunkName: 'page2' */ '@src/pages/page2'))

const { Header, Sider, Content } = Layout

export const Home = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  console.log(location)
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
  <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['/home/page1']}
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key='/home/page1' icon={<PieChartOutlined />}>
            <Link to='page1'>
              <span>页面1</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='/home/page2' icon={<PieChartOutlined />}>
            <Link to='page2'>
              <span>页面2</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            height: '100%',
          }}
        >
          <Routes>
            <Route
              path='page1'
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Page1 />
                </Suspense>
              }
            ></Route>
            <Route
              path='page2'
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Page2 />
                </Suspense>
              }
            ></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}
