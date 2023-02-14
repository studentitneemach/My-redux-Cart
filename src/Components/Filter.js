import React, { useEffect } from "react";
export const Filter =(count)=>{
  
    return( 
    <div className="filter">
        <div className="filter-result">  {count.count} Products</div>
<div className="filter-sort">
Order{" "} <select  value={count.sort} onChange={count.sortProducts}>
    <option>Latest</option>
    <option value="lowest">Lowest</option>
    <option value="hightest">Hightest</option>
    </select>
    </div>
<div className="filter-size">Filter{" "}</div>
<select  value={count.size} onChange={count.filterProducts}>
    <option value="">All</option>
    <option value="XS">XS</option>
    <option value="S">S</option>
    <option value="M">M</option>
    <option value="L">L</option>
    <option value="XL">XL</option>
    <option value="XXL">XXL</option>
</select>
    </div>)
}

