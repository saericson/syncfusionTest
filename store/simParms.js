// store/fruits.js

export const state = () => ({
  parms: [],
  lobs: [
    { longName: 'Personal Property', shortName: 'PProp' },
    { longName: 'Personal Auto', shortName: 'PAuto' },
    { longName: 'Commercial Property', shortName: 'CProp' },
    { longName: 'Commercial Auto', shortName: 'CAuto' },
    { longName: 'Professional Liability', shortName: 'ProfLiab' },
    { longName: 'Workers Compensation', shortName: 'WC' },
    { longName: 'Products Liability', shortName: 'ProdLiab' },
    { longName: 'Medical Malpractice', shortName: 'MedMal' },
  ],
  bus: [
    { longName: 'North East US', shortName: 'NE_US' },
    { longName: 'South East US', shortName: 'SE_US' },
    { longName: 'Central US', shortName: 'CE_US' },
    { longName: 'South West US', shortName: 'SW_US' },
    { longName: 'North West US', shortName: 'NW_US' },
    { longName: 'Canada', shortName: 'CAN' },
    { longName: 'Mexico', shortName: 'MEX' },
  ],
})

export const mutations = {
  ADD_LOB(state, lob) {
    state.lobs.push(lob)
  },
  DROP_LOB(state, dLob) {
    state.lobs = state.lobs.map(e=>{
        if(e.lobName===dLob){
            e.alive=false
        }
        return e
    })
  },
  ADD_BU(state, bu) {
    state.bus.push(bu)
  },
  DROP_BU(state, dBu) {
    state.bus = state.bus.map(e=>{
        if(e.lobName===dBu){
            e.alive=false
        }
        return e
    })
  },
  SET_PARMS(state, parms) {
    state.parms = parms
  },
  SET_BUS(state, bus) {
    state.bus = bus
  },
  SET_LOBS(state, lobs) {
    state.lobs = lobs
  },
  RENAME_BU(state, bu) {
    const idx = state.bus.findIndex((e) => e.longName === bu.item)
    const bus = state.bus
    bu={longName: bu.longName, shortName: bu.shortName}
    bus[idx] = bu
    state.bus=bus
  },
  RENAME_LOB(state, lob) {
    const idx = state.lobs.findIndex((e) => e.longName === lob.item)
    const lobs = state.lobs
    lob={longName: lob.longName, shortName: lob.shortName}
    lobs[idx] = lob
    state.lobs = lobs
  },
}

export const actions = {
  INIT_PARMS(context) {
    if (context.state.parms.length === 0) {
      const parms = context.getters.getParms
      context.commit('SET_PARMS', parms)
    }
  },
  NEW_PARMS(context) {
    const parms = context.getters.getParms
    context.commit('SET_PARMS', parms)
  },

}

export const getters = {
  getParms: (state) => {
    const parms = []
    for (let b = 0; b < state.bus.length; b++) {
      for (let l = 0; l < state.lobs.length; l++) {
        const temp = {}
        temp.key = b * 1000 + l
        temp.alive = true
        temp.buName = state.bus[b].longName
        temp.bu = state.bus[b].shortName
        temp.lobName = state.lobs[l].longName
        temp.lob = state.lobs[l].shortName
        temp.prem = 100000
        temp.er = 0.28
        temp.lr = 0.68
        temp.cv = 0.35
        temp.dist = 'LogNormal'
        temp.cf = 1
        temp.cfwt = 0.4
        parms.push(temp)
      }
    }
    return parms
  },
  getUnused: (state) => {
    const parms = []
    const key = state.parms.map(e=>e.key)
    for (let b = 0; b < state.bus.length; b++) {
      for (let l = 0; l < state.lobs.length; l++) {
        const temp = {}
        temp.key = b * 1000 + l
        temp.buName = state.bus[b].longName
        temp.bu = state.bus[b].shortName
        temp.lobName = state.lobs[l].longName
        temp.lob = state.lobs[l].shortName
        const incl = state.bus[b].alive && state.lobs[l].alive && !key.includes(temp.key)
        if (incl) parms.push(temp)
      }
    }
    return parms
  },
}
