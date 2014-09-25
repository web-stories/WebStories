package org.webstories.web.filter;

import javax.servlet.annotation.WebFilter;

import com.fagnerbrack.servlet.convention.ConventionFilter;

@WebFilter( filterName = "url-convention" )
public class WebConventionFilter extends ConventionFilter {}
