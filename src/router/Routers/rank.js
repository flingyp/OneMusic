import Rank from 'components/rank/Rank'
import TopList from 'components/top-list/top-list'

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