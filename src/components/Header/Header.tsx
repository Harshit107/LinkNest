import { Layers, User } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { APP_CONFIG } from '../../config/app.config';
import { COLORS, SHADOWS, SPACING } from '../../constants/ui.constants';

const HeaderContainer = styled.header`
  height: 64px;
  background-color: ${COLORS.surface};
  border-bottom: 1px solid ${COLORS.border};
  display: flex;
  align-items: center;
  justify_content: space-between;
  padding: 0 ${SPACING.lg};
  box-shadow: ${SHADOWS.sm};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
  font-weight: 700;
  font-size: 1.25rem;
  color: ${COLORS.text.primary};
`;

const LogoIcon = styled.div`
  color: ${COLORS.primary};
  display: flex;
  align-items: center;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
  padding: ${SPACING.xs} ${SPACING.sm};
  border-radius: 99px;
  border: 1px solid ${COLORS.border};
  background-color: ${COLORS.background};
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${COLORS.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LogoSection>
        <LogoIcon>
          <Layers size={24} />
        </LogoIcon>
        {APP_CONFIG.name}
      </LogoSection>

      <UserProfile>
        <Avatar>
          <User size={18} />
        </Avatar>
      </UserProfile>
    </HeaderContainer>
  );
};
