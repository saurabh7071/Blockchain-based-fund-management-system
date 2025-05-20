import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const recentExpenses = [
  {
    category: "Infrastructure",
    amount: "₹1,50,000",
    date: "2023-05-17",
    hash: "0x8f7d...3b2a",
    status: "Verified",
  },
  {
    category: "Food & Prasad",
    amount: "₹25,000",
    date: "2023-05-16",
    hash: "0x2a1b...9c4d",
    status: "Verified",
  },
  {
    category: "Salaries",
    amount: "₹75,000",
    date: "2023-05-15",
    hash: "0x7e3f...5d2c",
    status: "Verified",
  },
  {
    category: "Events",
    amount: "₹50,000",
    date: "2023-05-14",
    hash: "0x4b2c...8e1a",
    status: "Verified",
  },
  {
    category: "Utilities",
    amount: "₹15,000",
    date: "2023-05-13",
    hash: "0x9d4e...2f7b",
    status: "Verified",
  },
]

export function RecentExpenses() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead className="text-right">Blockchain</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentExpenses.map((expense) => (
          <TableRow key={expense.hash}>
            <TableCell className="font-medium">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                {expense.category}
              </Badge>
            </TableCell>
            <TableCell>{expense.amount}</TableCell>
            <TableCell className="hidden md:table-cell">{new Date(expense.date).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">View on blockchain</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
