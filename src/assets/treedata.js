export const defaults0 = ["large", "medium", "small"];
export const defaults1 = ["in", "out"];

export function countLeaf(obj,res){
  if(!obj.children||obj.children.length===0){
    res.leaf++
  }else{
    for(let i in obj.children){
      countLeaf(obj.children[i],res)
    }
  }
}

export const treedata = {
  label: "kpop",
  value:'0',
  type0: 0,
  type1: 0,
  children: [
    {
      label: "jyp",
      value:'00',
      type0: 1,
      type1: 0
    },
    {
      label: "sm",
      value:'01',
      type0: 2,
      type1: 0,
      children:[
        {
          label: "tvxq",
          value:'010',
          type0: 1,
          type1: 0,
          children:[
            {
              label: "uknow",
              value:'0100',
              type0: 2,
              type1: 0,
            },
            {
              label: "kjj",
              value:'0101',
              type0: 2,
              type1: 0,
            }
          ]
        },
        {
          label: "shinee",
          value:'011',
          type0: 1,
          type1: 0,
        }
      ]
    },
    {
      label: "bighit",
      value:'02',
      type0: 0,
      type1: 1
    }
  ]
};
