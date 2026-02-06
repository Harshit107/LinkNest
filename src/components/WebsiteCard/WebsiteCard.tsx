import { ExternalLink, Globe, Trash2 } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { BORDER_RADIUS, SHADOWS, SPACING, TRANSITIONS } from '../../constants/ui.constants';
import type { Website } from '../../types';

interface WebsiteCardProps {
  website: Website;
  onDelete?: (id: string) => void;
}

const CardContainer = styled.a`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${BORDER_RADIUS.lg};
  padding: ${SPACING.md};
  cursor: pointer;
  transition: ${TRANSITIONS.default};
  text-decoration: none;
  position: relative;
  height: 140px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${SHADOWS.cardHover};
    border-color: ${({ theme }) => theme.primary};
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${BORDER_RADIUS.md};
  background-color: ${({ theme }) => theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${SPACING.md};
  overflow: hidden;

  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xs};
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UrlText = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text.muted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Actions = styled.div`
  position: absolute;
  top: ${SPACING.md};
  right: ${SPACING.md};
  display: flex;
  gap: ${SPACING.xs};
  opacity: 0;
  transition: ${TRANSITIONS.default};

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.div`
  color: ${({ theme }) => theme.text.muted};
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.text.primary};
    background-color: ${({ theme }) => theme.background};
  }
  
  &.delete:hover {
    color: ${({ theme }) => theme.danger};
    background-color: ${({ theme }) => theme.danger}20;
  }
`;

export const WebsiteCard: React.FC<WebsiteCardProps> = ({ website, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.(website.id);
  };

  return (
    <CardContainer href={website.url} target="_blank" rel="noopener noreferrer">
      <Actions>
        <ActionButton>
           <ExternalLink size={16} />
        </ActionButton>
        {onDelete && (
          <ActionButton className="delete" onClick={handleDelete}>
            <Trash2 size={16} />
          </ActionButton>
        )}
      </Actions>
      
      <IconWrapper>
        {website.favicon ? (
          <img src={website.favicon} alt={website.title} onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).parentElement!.classList.add('fallback');
          }} />
        ) : (
          <Globe size={24} color="#64748B" /> 
        )}
        {/* Fallback icon if image fails */}
        <div className="icon-fallback" style={{ display: 'none' }}>
           <Globe size={24} color="#64748B" />
        </div>
      </IconWrapper>

      <Content>
        <Title>{website.title}</Title>
        <UrlText>{website.url}</UrlText>
      </Content>
    </CardContainer>
  );
};
