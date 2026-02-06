import React, { useState } from 'react';
import styled from 'styled-components';
import { ContentArea } from '../components/ContentArea/ContentArea';
import { Header } from '../components/Header/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { COLORS } from '../constants/ui.constants';

// We'll import ContentArea later
const MainContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
`;

const LayoutWrapper = styled.div`
  display: flex;
  padding-top: 64px; /* Header height */
`;

const ContentWrapper = styled.main`
  flex: 1;
  margin-left: 260px; /* Sidebar width */
  padding: 32px;
  height: calc(100vh - 64px);
  overflow-y: auto;
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${COLORS.text.muted};
  font-size: 1.1rem;
`;

const Dashboard: React.FC = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  return (
    <MainContainer>
      <Header />
      <LayoutWrapper>
        <Sidebar 
          selectedFolderId={selectedFolderId} 
          onSelectFolder={setSelectedFolderId} 
        />
        <ContentWrapper>
          {selectedFolderId ? (
            <ContentArea folderId={selectedFolderId} />
          ) : (
            <Placeholder>Select a folder to view websites</Placeholder>
          )}
        </ContentWrapper>
      </LayoutWrapper>
    </MainContainer>
  );
};

export default Dashboard;
