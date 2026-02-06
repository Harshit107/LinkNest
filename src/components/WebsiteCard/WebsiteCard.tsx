import { ExternalLink, Globe } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { BORDER_RADIUS, COLORS, SHADOWS, SPACING, TRANSITIONS } from '../../constants/ui.constants';
import type { Website } from '../../types';

interface WebsiteCardProps {
  website: Website;
}

const CardContainer = styled.a`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.surface};
  border: 1px solid ${COLORS.border};
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
    border-color: ${COLORS.primary};
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${BORDER_RADIUS.md};
  background-color: ${COLORS.background};
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
  color: ${COLORS.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UrlText = styled.span`
  font-size: 0.8rem;
  color: ${COLORS.text.muted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ExternalIcon = styled.div`
  position: absolute;
  top: ${SPACING.md};
  right: ${SPACING.md};
  color: ${COLORS.text.muted};
  opacity: 0;
  transition: ${TRANSITIONS.default};

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

export const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  return (
    <CardContainer href={website.url} target="_blank" rel="noopener noreferrer">
      <ExternalIcon>
        <ExternalLink size={16} />
      </ExternalIcon>
      
      <IconWrapper>
        {website.favicon ? (
          <img src={website.favicon} alt={website.title} onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).parentElement!.classList.add('fallback');
          }} />
        ) : (
          <Globe size={24} color={COLORS.text.secondary} />
        )}
        {/* Fallback icon if image fails */}
        <div className="icon-fallback" style={{ display: 'none' }}>
           <Globe size={24} color={COLORS.text.secondary} />
        </div>
      </IconWrapper>

      <Content>
        <Title>{website.title}</Title>
        <UrlText>{website.url}</UrlText>
      </Content>
    </CardContainer>
  );
};
