const Rank = resolve => {
  import('components/rank/Rank').then((module) => {
    resolve(module)
  })
}

const TopList = resolve => {
  import('components/top-list/top-list').then((module) => {
    resolve(module)
  })
}

export default {
  path: '/rank',
  component: Rank,
  children: [
    {
      path: ':id',
      component: TopList
    }
  ]
}