export const columns = [
  {
    accessorKey: "logo",
    header: "",
    cell: ({ row }) => (
      <img
        src={row.original?.owner?.avatar_url}
        className="h-14 w-14 object-contain rounded"
        alt={`${row.original?.owner?.avatar_url} logo`}
      />
    ),
  },
  {
    accessorKey: "name",
    header: (
      <div className="text-center font-semibold text-black">Nom du dépôt</div>
    ),
    cell: ({ row }) => (
      <div className="grid gap-1">
        <div className="font-medium">
          <p className="w-48">{row.original.name}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => (
      <div className="w-60 text-center font-semibold text-black">
        Description
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-balance w-60">
        {row.original.description || "_"}
      </div>
    ),
  },
  {
    accessorKey: "language",
    header: () => (
      <div className="flex mx-auto font-semibold text-black">Langage</div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-sm text-muted-foreground">
        {row.original.language || "_"}
      </div>
    ),
  },
  {
    accessorKey: "stars",
    header: () => (
      <div className="flex mx-auto font-semibold text-black">
        Nombre d'étoiles
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-sm text-muted-foreground">
        {row.original.stargazers_count} étoiles
      </div>
    ),
  },
];
