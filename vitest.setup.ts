import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock global fetch for dictionary and letter data loading
global.fetch = vi.fn();
