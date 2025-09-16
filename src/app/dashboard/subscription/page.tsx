const data = [
  { name: 'Subcription Name', content: ' Premium' },
  { name: 'Package & billing details', content: ' $222.00' },
  { name: 'Remaining post', content: ' 18' },
  { name: 'Expire date', content: ' October 20, 2021' },
]

const DashboardSubcription = () => {
  return (
    <div className="rounded-xl border p-4">
      <div className="py-5">
        <h3 className="text-lg leading-6 font-medium">Package Information</h3>
        <p className="mt-2 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
          {`You've subscribed to the following package`}
        </p>
      </div>
      <div className="mt-4 border-t">
        <dl>
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800' : 'bg-white dark:bg-neutral-900'
                } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
              >
                <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-300">{item.name}</dt>
                <dd className="mt-1 text-sm font-medium text-neutral-900 sm:col-span-2 sm:mt-0 dark:text-neutral-200">
                  {item.content}
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </div>
  )
}

export default DashboardSubcription
