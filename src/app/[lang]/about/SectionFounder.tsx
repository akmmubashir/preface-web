const FOUNDERS = [
  {
    id: '1',
    name: `Niamh O'Shea`,
    job: 'Co-founder and Chief Executive',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    name: `Danien Jame`,
    job: 'Co-founder and Chief Executive',
    avatar:
      'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=3246&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    name: `Orla Dwyer`,
    job: 'Co-founder, Chairman',
    avatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '4',
    name: `Dara Frazier`,
    job: 'Co-Founder, Chief Strategy Officer',
    avatar:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '5',
    name: `Dara Frazier`,
    job: 'Co-Founder, Chief Strategy Officer',
    avatar:
      'https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '6',
    name: `Dara Frazier`,
    job: 'Co-Founder, Chief Strategy Officer',
    avatar:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '7',
    name: `Dara Frazier`,
    job: 'Co-Founder, Chief Strategy Officer',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '8',
    name: `Dara Frazier`,
    job: 'Co-Founder, Chief Strategy Officer',
    avatar:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '9',
    name: `Dara Frazier`,
    job: 'Co-Founder, Chief Strategy Officer',
    avatar:
      'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=3246&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '10',
    name: `Dara Frazier`,
    job: 'Co-Founder, Chief Strategy Officer',
    avatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

export default function Example() {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-semibold tracking-tight text-pretty sm:text-4xl lg:text-5xl">Our team</h2>
        <p className="mt-6 text-lg/8 text-neutral-600 dark:text-neutral-400">
          We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best
          results for our clients.
        </p>
      </div>
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
      >
        {FOUNDERS.map((person) => (
          <li key={person.id}>
            <img alt={person.name} src={person.avatar} className="mx-auto size-24 rounded-full object-cover" />
            <h3 className="mt-6 text-base/7 font-semibold tracking-tight">{person.name}</h3>
            <p className="text-sm/6 text-neutral-600 dark:text-neutral-400">{person.job}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
