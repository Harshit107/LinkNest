import { X } from 'lucide-react';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { BORDER_RADIUS, COLORS, SHADOWS, SPACING } from '../../constants/ui.constants';

interface AddWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; url: string }) => Promise<void>;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${COLORS.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContainer = styled.div`
  background-color: ${COLORS.surface};
  width: 100%;
  max-width: 400px;
  border-radius: ${BORDER_RADIUS.lg};
  box-shadow: ${SHADOWS.lg};
  padding: ${SPACING.lg};
  position: relative;
  animation: ${slideUp} 0.3s ease-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${SPACING.lg};
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.text.primary};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${COLORS.text.secondary};
  padding: 4px;
  border-radius: 50%;
  display: flex;
  &:hover {
    background-color: ${COLORS.background};
    color: ${COLORS.text.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xs};
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${COLORS.text.secondary};
`;

const Input = styled.input`
  padding: ${SPACING.sm};
  border: 1px solid ${COLORS.border};
  border-radius: ${BORDER_RADIUS.md};
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${COLORS.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  background-color: ${COLORS.surface};
  padding-top: ${SPACING.md};
  justify-content: flex-end;
  gap: ${SPACING.sm};
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${SPACING.sm} ${SPACING.md};
  border-radius: ${BORDER_RADIUS.md};
  font-weight: 500;
  border: none;
  
  background-color: ${(props) => props.$variant === 'primary' ? COLORS.primary : COLORS.background};
  color: ${(props) => props.$variant === 'primary' ? 'white' : COLORS.text.primary};

  &:hover {
    background-color: ${(props) => props.$variant === 'primary' ? COLORS.primaryHover : '#e2e8f0'};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const AddWebsiteModal: React.FC<AddWebsiteModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    setIsSubmitting(true);
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`;
    }

    try {
      await onSubmit({ title, url: formattedUrl });
      setTitle('');
      setUrl('');
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Add Website</Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Website Title</Label>
            <Input 
              placeholder="e.g. My Portfolio" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              autoFocus
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>URL</Label>
            <Input 
              placeholder="e.g. portfolio.com" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              required
            />
          </FormGroup>
          <ButtonGroup>
            <Button type="button" $variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" $variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Website'}
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContainer>
    </Overlay>
  );
};
