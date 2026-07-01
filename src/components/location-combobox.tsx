import { useNavigate, useLocation } from 'react-router-dom'
import { useLocations } from '@/hooks/use-ticket'
import { cn } from '@/lib/utils'
import { MapPinIcon, ChevronsUpDownIcon, CheckIcon } from 'lucide-react'
import * as React from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

export function LocationCombobox() {
  const [open, setOpen] = React.useState(false)
  const { data: locations } = useLocations()
  const navigate = useNavigate()
  const location = useLocation()

  const match = location.pathname.match(/\/ticket\/lokasi\/(\d+)/)
  const currentId = match ? Number(match[1]) : null
  const currentLocation = locations?.find((l) => l.id === currentId)

  const handleSelect = (id: number) => {
    setOpen(false)
    const tabMatch = location.pathname.match(/\/ticket\/lokasi\/\d+\/(\w+)/)
    const tab = tabMatch ? tabMatch[1] : 'overview'
    navigate(`/ticket/lokasi/${id}/${tab}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-52 justify-between gap-2 text-sm"
        >
          <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="flex-1 truncate text-left">
            {currentLocation ? currentLocation.name : 'Pilih lokasi...'}
          </span>
          <ChevronsUpDownIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <Command>
          <CommandInput placeholder="Cari lokasi..." />
          <CommandList>
            <CommandEmpty>Lokasi tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {locations?.map((loc) => (
                <CommandItem
                  key={loc.id}
                  value={loc.name}
                  onSelect={() => handleSelect(loc.id)}
                  className="gap-2"
                >
                  <CheckIcon
                    className={cn('h-4 w-4 shrink-0', loc.id === currentId ? 'opacity-100' : 'opacity-0')}
                  />
                  <span className="truncate">{loc.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
