import Recommend from 'components/recommend/Recommend.vue'
import Disc from 'components/disc/disc'

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