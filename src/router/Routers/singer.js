const Singer = resolve => {
  import('components/singer/Singer').then((module) => {
    resolve(module)
  })
}

const SingerDetail = resolve => {
  import('components/singer-detail/singer-detail').then((module) => {
    resolve(module)
  })
}

export default {
  path: '/singer',
  component: Singer,
  children: [
    {
      path: '/singer/:id',
      component: SingerDetail
    }
  ]
}