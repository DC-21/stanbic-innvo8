/* eslint-disable react/function-component-definition */
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import React from 'react';
import { Application } from '../../../types';

interface Props {
  application: Application | undefined;
}
const ViewApplication: React.FC<Props> = ({ application }) => {
  return (
    <div style={{ flexGrow: 1, padding: 20 }}>
      <Typography variant="h3" color="primary">
        <b>Team: {application?.teamId.name}</b>
      </Typography>
      <Table sx={{ backgroundColor: '#fff' }}>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color="primary">
                Title
              </Typography>
            </TableCell>
            <TableCell>:{application?.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color="primary">
                Category
              </Typography>
            </TableCell>
            <TableCell>:{application?.category}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color="primary">
                Problem
              </Typography>
            </TableCell>
            <TableCell>:{application?.problem}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color="primary">
                Proposed Solution
              </Typography>
            </TableCell>
            <TableCell>
              :{application?.proposedSolution}Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Gravida arcu ac tortor dignissim
              convallis aenean et tortor. Mi ipsum faucibus vitae aliquet nec
              ullamcorper sit amet. Viverra mauris in aliquam sem fringilla.
              Pretium fusce id velit ut tortor. Malesuada proin libero nunc
              consequat. A iaculis at erat pellentesque adipiscing commodo elit
              at. Eu ultrices vitae auctor eu. Consequat mauris nunc congue nisi
              vitae suscipit tellus mauris. Aenean et tortor at risus viverra
              adipiscing at in. Consequat id porta nibh venenatis cras sed felis
              eget velit. Risus sed vulputate odio ut enim. At tempor commodo
              ullamcorper a lacus. Viverra ipsum nunc aliquet bibendum enim
              facilisis gravida neque convallis. Purus viverra accumsan in nisl
              nisi. Sed velit dignissim sodales ut eu sem. Viverra orci sagittis
              eu volutpat. Sit amet est placerat in egestas erat. Scelerisque in
              dictum non consectetur a erat nam at lectus. Faucibus a
              pellentesque sit amet porttitor eget dolor morbi. Pulvinar mattis
              nunc sed blandit libero volutpat. Diam quam nulla porttitor massa.
              Ut consequat semper viverra nam libero justo laoreet. In nisl nisi
              scelerisque eu ultrices vitae auctor eu. Augue interdum velit
              euismod in pellentesque. Est pellentesque elit ullamcorper
              dignissim cras. Risus quis varius quam quisque id diam vel. Sit
              amet purus gravida quis blandit turpis cursus in hac. Egestas
              egestas fringilla phasellus faucibus scelerisque eleifend donec.
              Tellus mauris a diam maecenas. Diam phasellus vestibulum lorem sed
              risus ultricies tristique nulla. Commodo elit at imperdiet dui
              accumsan sit amet nulla. Mauris sit amet massa vitae tortor. Sed
              risus ultricies tristique nulla aliquet. Donec massa sapien
              faucibus et molestie ac feugiat sed. Quis varius quam quisque id
              diam vel quam elementum. Mollis aliquam ut porttitor leo. Faucibus
              scelerisque eleifend donec pretium vulputate sapien nec sagittis.
              Neque aliquam vestibulum morbi blandit. Massa eget egestas purus
              viverra accumsan in nisl. Congue nisi vitae suscipit tellus mauris
              a diam maecenas sed. Blandit cursus risus at ultrices mi tempus
              imperdiet nulla. Porta lorem mollis aliquam ut. Egestas erat
              imperdiet sed euismod nisi porta lorem mollis. Nibh praesent
              tristique magna sit amet purus gravida quis blandit. Ultricies
              lacus sed turpis tincidunt id aliquet. Mauris in aliquam sem
              fringilla ut morbi tincidunt augue interdum. Consectetur libero id
              faucibus nisl tincidunt eget nullam. Mi quis hendrerit dolor magna
              eget est lorem ipsum. Quis blandit turpis cursus in hac. Eget est
              lorem ipsum dolor sit amet. Sed adipiscing diam donec adipiscing
              tristique risus. Odio facilisis mauris sit amet massa vitae
              tortor. Sed elementum tempus egestas sed. Eu tincidunt tortor
              aliquam nulla. Orci dapibus ultrices in iaculis nunc sed augue.
              Aliquet enim tortor at auctor urna nunc id cursus metus. Sed odio
              morbi quis commodo. Varius quam quisque id diam vel quam
              elementum. Scelerisque viverra mauris in aliquam sem fringilla.
              Venenatis lectus magna fringilla urna porttitor rhoncus. Tristique
              senectus et netus et malesuada fames ac. Mattis vulputate enim
              nulla aliquet porttitor lacus luctus accumsan. Morbi tristique
              senectus et netus. Porta nibh venenatis cras sed felis eget velit
              aliquet sagittis. Accumsan sit amet nulla facilisi morbi. Feugiat
              nisl pretium fusce id velit ut tortor pretium viverra. Quis vel
              eros donec ac. Ullamcorper malesuada proin libero nunc consequat
              interdum varius. Luctus accumsan tortor posuere ac. Netus et
              malesuada fames ac turpis egestas sed tempus. Cursus euismod quis
              viverra nibh cras.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewApplication;
