import React, { useMemo } from 'react';
import { MainLayout } from '../Styles/Layout';
import { SkeletonTheme } from 'react-loading-skeleton';
import Navbar from './Navbar';
import { styled } from 'styled-components';
import Animation from './Animation';

export default function AppLayout({ children }) {
    const backAnimation = useMemo(()=>{
        return <Animation/>
    },[])
    return (
        <SkeletonTheme baseColor="#d1cfc9" highlightColor="#82817f">
            <HomeStyle>
                {backAnimation}
                <MainLayout>
                    <Navbar/>
                    <main>
                        {children}
                    </main>
                </MainLayout>
            </HomeStyle>
        </SkeletonTheme>
    )
}

const HomeStyle = styled.div`
  height: 100vh;
  background-image: url('../../utils/bg.png');
  position: relative;
  main{
    flex: 1;
    background: rgba(252,246,249,0.78);
    border: 3px solid #FFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
        width: 0;
    }
  }
`;