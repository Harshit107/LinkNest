import { AlertTriangle, X } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { BORDER_RADIUS, SHADOWS, SPACING } from '../../constants/ui.constants';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: ${BORDER_RADIUS.lg};
  box-shadow: ${SHADOWS.lg};
  width: 100%;
  max-width: 400px;
  border: 1px solid ${({ theme }) => theme.border};
  transform: scale(1);
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${SPACING.lg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
  color: ${({ theme }) => theme.text.primary};
  font-weight: 600;
  font-size: 1.1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text.muted};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text.primary};
  }
`;

const ModalBody = styled.div`
  padding: ${SPACING.lg};
  color: ${({ theme }) => theme.text.secondary};
  line-height: 1.5;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${SPACING.md};
  padding: ${SPACING.lg};
  background-color: ${({ theme }) => theme.background};
  border-top: 1px solid ${({ theme }) => theme.border};
  border-radius: 0 0 ${BORDER_RADIUS.lg} ${BORDER_RADIUS.lg};
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: ${SPACING.sm} ${SPACING.md};
  border-radius: ${BORDER_RADIUS.md};
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'danger':
        return `
          background-color: ${theme.danger};
          color: white;
          &:hover { filter: brightness(1.1); }
        `;
      case 'secondary':
        return `
          background-color: transparent;
          border: 1px solid ${theme.border};
          color: ${theme.text.primary};
          &:hover { background-color: ${theme.surface}; }
        `;
      default:
        return `
          background-color: ${theme.primary};
          color: white;
          &:hover { background-color: ${theme.primaryHover}; }
        `;
    }
  }}
`;

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay $isOpen={isOpen} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <ModalContainer>
        <ModalHeader>
          <TitleWrapper>
            {isDestructive && <AlertTriangle size={20} color="#EF4444" />}
            {title}
          </TitleWrapper>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button $variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button 
            $variant={isDestructive ? 'danger' : 'primary'} 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};
