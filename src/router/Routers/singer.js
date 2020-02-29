import Singer from 'components/singer/Singer'
import SingerDetail from 'components/singer-detail/singer-detail'

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