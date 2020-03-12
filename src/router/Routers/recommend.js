const Recommend = resolve => {
  import('components/recommend/Recommend').then((module) => {
    resolve(module)
  })
}

const Disc = resolve => {
  import('components/disc/disc').then((module) => {
    resolve(module)
  })
}

export default {
  path: '/recommend',
  component: Recommend,
  children: [
    {
      path: ':id',
      component: Disc
    }
  ]
}