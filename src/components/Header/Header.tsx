import { Layers, Moon, Sun } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { APP_CONFIG } from '../../config/app.config';
import { SHADOWS, SPACING } from '../../constants/ui.constants';
import { useTheme } from '../../context/ThemeContext';

const HeaderContainer = styled.header`
  height: 64px;
  background-color: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${SPACING.lg};
  box-shadow: ${SHADOWS.sm};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.md};
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
  font-weight: 700;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text.primary};
`;

const LogoIcon = styled.div`
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text.secondary};
  padding: ${SPACING.xs};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.text.primary};
    background-color: ${({ theme }) => theme.background};
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
  padding: ${SPACING.xs} ${SPACING.sm};
  border-radius: 99px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Header: React.FC = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <LogoSection>
        <LogoIcon>
          <Layers size={24} />
        </LogoIcon>
        {APP_CONFIG.name}
      </LogoSection>

      <Section>
        <ThemeToggle onClick={toggleTheme} title="Toggle Theme">
          {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </ThemeToggle>
        
        <UserProfile>
          <Avatar>
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User" />
          </Avatar>
        </UserProfile>
      </Section>
    </HeaderContainer>
  );
};
