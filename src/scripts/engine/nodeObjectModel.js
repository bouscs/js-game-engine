const child1 = {
  name: 'child1',
  setup() {
    return {
      a: 'kjbfk',
    }
  },
}

export default {
  name: 'node1',
  nodes: {
    child1,
  },
  // inicializar primeiro as children porque daí pode usar elas aqui no setup
  setup(ctx) {
    ctx.log(this.child1.a)

    return {
      data1: 'jdsfkjhfsd',
    }
  },
  vars: {
    datasdadasd: 'dgsgfds',
  },
  methods: {
    changeVar() {
      this.data1 = 'idushfsd'
    },
    async waitAndDie() {},
  },
}
