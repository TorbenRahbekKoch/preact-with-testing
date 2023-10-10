import { fireEvent, render, screen,waitFor } from '@testing-library/preact'
import { describe, expect, test  } from 'vitest'
import { App } from './app'

describe('Some test this is!', () => {
    test('Are we closing in on something?', () => {
        expect(1 + 2).toBe(3)
    }),

    test('Do we dare?', async () => {
        await render(<App></App>)

        const button = screen.queryByText("count is", {exact: false})

        await fireEvent.click(button!)

        await waitFor(() => {
            expect(button?.textContent).toContain("1")
        }, { interval: 1000})
    })
})