import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

(window as any).IntersectionObserver = MockIntersectionObserver;


