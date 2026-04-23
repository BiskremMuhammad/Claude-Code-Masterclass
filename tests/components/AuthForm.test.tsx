import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { vi } from "vitest"
import AuthForm from "@/components/AuthForm"

const mockLogin = vi.fn()
const mockSignup = vi.fn()
const mockPush = vi.fn()

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ login: mockLogin, signup: mockSignup }),
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}))

vi.mock("next/link", () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}))

describe("AuthForm", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("login mode", () => {
    it("renders login heading", () => {
      render(<AuthForm mode="login" />)
      expect(screen.getByText("Welcome Back, Agent")).toBeInTheDocument()
    })

    it("does not render name field", () => {
      render(<AuthForm mode="login" />)
      expect(screen.queryByLabelText(/agent name/i)).not.toBeInTheDocument()
    })

    it("renders email and password fields", () => {
      render(<AuthForm mode="login" />)
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })

    it("renders the correct submit button label", () => {
      render(<AuthForm mode="login" />)
      expect(screen.getByRole("button", { name: /access mission files/i })).toBeInTheDocument()
    })

    it("calls login and redirects on successful submit", async () => {
      mockLogin.mockResolvedValue(undefined)
      render(<AuthForm mode="login" />)

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "agent@test.com" } })
      fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } })
      fireEvent.click(screen.getByRole("button", { name: /access mission files/i }))

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith("agent@test.com", "password123")
        expect(mockPush).toHaveBeenCalledWith("/heists")
      })
    })
  })

  describe("signup mode", () => {
    it("renders signup heading", () => {
      render(<AuthForm mode="signup" />)
      expect(screen.getByText("Join the Crew")).toBeInTheDocument()
    })

    it("renders name field with optional label", () => {
      render(<AuthForm mode="signup" />)
      expect(screen.getByLabelText(/agent name/i)).toBeInTheDocument()
      expect(screen.getByText("(optional)")).toBeInTheDocument()
    })

    it("renders the correct submit button label", () => {
      render(<AuthForm mode="signup" />)
      expect(screen.getByRole("button", { name: /initiate mission/i })).toBeInTheDocument()
    })

    it("calls signup and redirects on successful submit", async () => {
      mockSignup.mockResolvedValue(undefined)
      render(<AuthForm mode="signup" />)

      fireEvent.change(screen.getByLabelText(/agent name/i), { target: { value: "Agent Smith" } })
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "agent@test.com" } })
      fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } })
      fireEvent.click(screen.getByRole("button", { name: /initiate mission/i }))

      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith("agent@test.com", "Agent Smith", "password123")
        expect(mockPush).toHaveBeenCalledWith("/heists")
      })
    })
  })

  describe("error state", () => {
    it("shows error alert when login fails", async () => {
      mockLogin.mockRejectedValue(new Error("Login failed"))
      render(<AuthForm mode="login" />)

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "agent@test.com" } })
      fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } })
      fireEvent.click(screen.getByRole("button", { name: /access mission files/i }))

      await waitFor(() => {
        const alert = screen.getByRole("alert")
        expect(alert).toBeInTheDocument()
        expect(alert).toHaveTextContent("Something went wrong. Please try again.")
      })
    })

    it("shows error alert when signup fails", async () => {
      mockSignup.mockRejectedValue(new Error("Signup failed"))
      render(<AuthForm mode="signup" />)

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "agent@test.com" } })
      fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } })
      fireEvent.click(screen.getByRole("button", { name: /initiate mission/i }))

      await waitFor(() => {
        const alert = screen.getByRole("alert")
        expect(alert).toBeInTheDocument()
        expect(alert).toHaveTextContent("Something went wrong. Please try again.")
      })
    })
  })
})
