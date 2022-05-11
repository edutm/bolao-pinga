import React from "react";
import { Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import MataMataResultado from "../MataMataResultado";


function MataMataOitavas() {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          marginTop: theme.spacing(1)
        }}
      >
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: theme.spacing(34),
            height: theme.spacing(16),
          }}
        >
          <MataMataResultado />

          
          <Box 
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}
          >
            <Box 
              sx={{
                borderTop: 1,
                borderRight: 1,
                borderTopRightRadius: theme.spacing(1),
                height: theme.spacing(8),
              }}
            />

          </Box>
        </Box>

        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: theme.spacing(34),
            height: theme.spacing(16),
          }}
        >
        
            <MataMataResultado />

            <Box 
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              <Box 
                sx={{
                  borderBottom: 1,
                  borderRight: 1,
                  borderBottomRightRadius: theme.spacing(1),
                  height: theme.spacing(8),
                }}
              />

            </Box>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: theme.spacing(1)
        }}
      >
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: theme.spacing(34),
            height: theme.spacing(16),
          }}
        >
          <MataMataResultado />

          
          <Box 
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}
          >
            <Box 
              sx={{
                borderTop: 1,
                borderRight: 1,
                borderTopRightRadius: theme.spacing(1),
                height: theme.spacing(8),
              }}
            />

          </Box>
        </Box>

        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: theme.spacing(34),
            height: theme.spacing(16),
          }}
        >
        
            <MataMataResultado />

            <Box 
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              <Box 
                sx={{
                  borderBottom: 1,
                  borderRight: 1,
                  borderBottomRightRadius: theme.spacing(1),
                  height: theme.spacing(8),
                }}
              />

            </Box>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: theme.spacing(1)
        }}
      >
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: theme.spacing(34),
            height: theme.spacing(16),
          }}
        >
          <MataMataResultado />

          
          <Box 
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}
          >
            <Box 
              sx={{
                borderTop: 1,
                borderRight: 1,
                borderTopRightRadius: theme.spacing(1),
                height: theme.spacing(8),
              }}
            />

          </Box>
        </Box>

        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: theme.spacing(34),
            height: theme.spacing(16),
          }}
        >
        
            <MataMataResultado />

            <Box 
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              <Box 
                sx={{
                  borderBottom: 1,
                  borderRight: 1,
                  borderBottomRightRadius: theme.spacing(1),
                  height: theme.spacing(8),
                }}
              />

            </Box>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: theme.spacing(2)
        }}
      >
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: theme.spacing(34),
            height: theme.spacing(16),
          }}
        >
          <MataMataResultado />

          
          <Box 
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}
          >
            <Box 
              sx={{
                borderTop: 1,
                borderRight: 1,
                borderTopRightRadius: theme.spacing(1),
                height: theme.spacing(8),
              }}
            />

          </Box>
        </Box>

        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: theme.spacing(34),
            height: theme.spacing(16),
          }}
        >
        
            <MataMataResultado />

            <Box 
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              <Box 
                sx={{
                  borderBottom: 1,
                  borderRight: 1,
                  borderBottomRightRadius: theme.spacing(1),
                  height: theme.spacing(8),
                }}
              />

            </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MataMataOitavas;